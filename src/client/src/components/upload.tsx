import { CloseFillIcon, NotificationFillIcon, AddFillIcon } from 'ultra-icon';
import { isNil } from 'lodash-es';
import React, { ChangeEvent, forwardRef, ReactNode, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { mergeProps } from '../utils/merge-props';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { fade } from '../utils/fade';
import { css } from '@emotion/react';

export interface UploadProps {
  children?: ReactNode;
  /**
   * @description.zh-CN 默认显示图片列表
   * @description.en-US default images
   */
  fileList?: BaseImageData[];
  /**
   * @description.zh-CN 文件列表改变后的回调
   * @description.en-US after image list change callback
   */
  onChange?: (imageList: BaseImageData[]) => void;
  /**
   * @description.zh-CN 点击每个文件后的回调
   * @description.en-US image click callback
   */
  onClick?: (image: BaseImageData) => void;
  /**
   * @description.zh-CN 删除图片后的回调
   * @description.en-US after remove image callback
   */
  onRemove?: (image: BaseImageData) => void;
  /**
   * @description.zh-CN 是否支持一次选择多个文件
   * @description.en-US support select multi files
   * @default true
   */
  multiple?: boolean;
  /**
   * @description.zh-CN 支持的文件后缀名
   * @description.en-US support file extensions
   * @default ['.jpg', '.jpeg', '.gif', '.png']
   */
  extensions?: string[];
  /**
   * @description.zh-CN 上传的图片不是合法的后缀名触发的回调
   * @description.en-US A callback triggered by an uploaded image is not a valid suffix
   */
  onOverExtensions?: (
    ext: string,
    extensions: string[],
  ) => (void | 'continue' | 'break') | Promise<void | 'continue' | 'break'>;
  /**
   * @description.zh-CN 图片最大数量
   * @description.en-US max image counts
   * @default 10
   */
  maxCount?: number;
  /**
   * @description.zh-CN 上传的图片超过最大数量限制后的回调
   * @description.en-US A callback after the maximum number of images uploaded exceeds the limit
   */
  onOverCount?: (count: number, maxCount: number) => (void | false) | Promise<void | false>;
  /**
   * @description.zh-CN 图片最大的字节数
   * @description.en-US max byte count
   * @default 5242880
   */
  maxSize?: number;
  /**
   * @description.zh-CN 上传的图片大小超过限制后的回调
   * @description.en-US A callback after the size of an uploaded image exceeds the limit
   */
  onOverSize?: (size: number, maxSize: number) => (void | 'continue' | 'break') | Promise<void | 'continue' | 'break'>;
  /**
   * @description.zh-CN 在图片中显示错误信息
   * @description.en-US show an error message in the image
   */
  renderError?: (image: ImageData) => React.ReactNode;
  /**
   * @description.zh-CN 添加头部内容
   * @description.en-US add header content
   */
  header?: React.ReactNode;
  /**
   * @description.zh-CN 添加尾部内容
   * @description.en-US add footer content
   */
  footer?: React.ReactNode;
  name?: string;
}

const defaultProps = {
  maxSize: 5242880,
  maxCount: 10,
  fileList: [],
  extensions: ['.jpg', '.jpeg', '.gif', '.png'],
  multiple: true,
};

export type MergedUploadProps = typeof defaultProps & UploadProps;

interface BaseImageData {
  url: string;
  name?: string;
}

enum ErrorType {
  OVER_COUNT,
  OVER_SIZE,
  OVER_EXTENSTIONS,
  SERVER_ERROR,
}

interface ImageData extends BaseImageData {
  file?: File;
  errorCode?: keyof typeof ErrorType;
}

const uuid = () => URL.createObjectURL(new Blob()).substr(-36);

export interface UploadRef {
  imageList: ImageData[];
}

const Upload = forwardRef<UploadRef, UploadProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const {
    fileList,
    onChange,
    onRemove,
    name,
    maxCount,
    onOverCount,
    onOverSize,
    onOverExtensions,
    extensions,
    multiple,
    maxSize,
    renderError,
    children,
  } = props;
  const [imageList, setImageList] = useState<ImageData[]>(() => {
    return fileList.map(f => ({
      ...f,
      name: f.url.substring(f.url.lastIndexOf('/') + 1),
    }));
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      imageList,
    }),
    [imageList],
  );

  const overCountNum = useMemo(() => {
    return imageList.filter(images => isNil(images.errorCode)).length - maxCount;
  }, [imageList, maxCount]);

  const onSelectFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const allFilePromises = [];
    const fileErrorList: (keyof typeof ErrorType)[] = [];

    for (const file of files) {
      if (!hasExtension(file.name)) {
        fileErrorList.push('OVER_EXTENSTIONS');
        if (typeof onOverExtensions === 'function') {
          const overExtensions = await onOverExtensions(file.name, extensions);

          if (overExtensions === 'continue') continue;
          else if (overExtensions === 'break') break;
        }
      } else if (file.size > maxSize) {
        fileErrorList.push('OVER_SIZE');
        if (typeof onOverSize === 'function') {
          const overSize = await onOverSize(file.size, maxSize);

          if (overSize === 'continue') continue;
          else if (overSize === 'break') break;
        }
      }

      allFilePromises.push(readFile(file));
    }

    const thisTimeOverCount = imageList.length + files.length - maxCount;

    if (thisTimeOverCount > 0) {
      if (typeof onOverCount === 'function') {
        const overCount = await onOverCount(maxCount + thisTimeOverCount, thisTimeOverCount);

        if (overCount === false) return;
      }
      const startIndex = files.length - thisTimeOverCount;

      allFilePromises.splice(startIndex - 1, thisTimeOverCount);
    }

    Promise.all(allFilePromises).then(newFilesData => {
      const data = newFilesData.map((item, i) => ({
        file: item.file,
        url: item.url,
        name: item.file.name,
        errorCode: fileErrorList[i],
      }));
      const list = [...imageList, ...data];

      onChange?.(list);
      setImageList(list);
    });
  };

  const onDelete = (index: number) => {
    const list = [...imageList];

    onRemove?.(list[index]);
    list.splice(index, 1);
    onChange?.(list);
    setImageList(list);
  };

  const simulatorClick = () => {
    inputRef.current?.click();
  };

  const hasExtension = (fileName: string) => {
    if (!extensions.length) return false;
    const pattern = '(' + extensions.join('|').replace(/\./g, '\\.') + ')$';

    return new RegExp(pattern, 'i').test(fileName);
  };

  const readFile = (file: File) => {
    return new Promise<{ file: File; url: string }>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const r = e.target as FileReader;

        if (!r) return reject();
        if (!r.result) return reject();
        let dataURL = r.result as string;

        dataURL = dataURL.replace(';base64', `;name=${file.name};base64`);
        resolve({ file, url: dataURL });
      };

      reader.readAsDataURL(file);
    });
  };

  const customAdd = children || <AddFillIcon size="24" />;

  return (
    <div className="ultra-upload" css={uploadStyles}>
      {props.header}
      <div className="ultra-uplopd-content">
        {imageList.map((img, index) => (
          <div className="ultra-uplopd-item" key={img.name + uuid()}>
            <img className="ultra-uplopd-item__img" src={img.url} />
            <span className="ultra-uplopd-item__remove" onClick={() => onDelete(index)}>
              <CloseFillIcon size="12" />
            </span>
            {img.errorCode && (
              <Popover>
                <PopoverContent>renderError?.(img)</PopoverContent>
                <PopoverTrigger>
                  <div className="ultra-uplopd-item__error">
                    <NotificationFillIcon size="16" />
                    <div className="ultra-uplopd-item__error_text">{renderError?.(img)}</div>
                  </div>
                </PopoverTrigger>
              </Popover>
            )}
          </div>
        ))}
        {overCountNum < 0 && (
          <div className="ultra-uplopd-item ultra-uplopd-item--add" onClick={simulatorClick}>
            {customAdd}
          </div>
        )}

        <input
          className="ultra-uplopd-input"
          type="file"
          ref={inputRef}
          name={name}
          multiple={multiple}
          // onChange={this.onDropFile}
          onClick={(e: any) => {
            e.target.value = null;
          }}
          onChange={onSelectFiles}
          accept="image/*"
        />
      </div>
      {props.footer}
    </div>
  );
});

export default Upload;

const uploadStyles = css`
  font-size: 14px;
  .ultra-uplopd-content {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .ultra-uplopd-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    &.ultra-uplopd-item--add {
      border-style: dashed;
    }
    &:not(.ultra-uplopd-item--add) {
      .ultra-uplopd-item__img {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        object-fit: cover;
      }
      .ultra-uplopd-item__remove {
        width: 18px;
        height: 18px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        color: #ffffff;
        opacity: 1;
        position: absolute;
        top: 4px;
        right: 4px;
        transition: opacity 0.3s;
        z-index: 10;
        .i-icon {
          display: inline-flex;
          align-items: center;
        }
        &:hover {
          background-color: #ffffff;
          border-radius: 50%;
          color: var(--ck-colors-chakra-body-text);
        }
      }
      .ultra-uplopd-item__error {
        width: 100%;
        background-color: ${fade('#ff0000', 0.8)};
        padding: 4px;
        position: absolute;
        bottom: 4px;
        color: #fff;
        display: flex;
        z-index: 11;
        .i-icon {
          display: flex;
          align-items: center;
          margin-right: 4px;
        }
        &_text {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
        }
      }
      &:before {
        visibility: hidden;
        opacity: 0;
        background-color: ${fade('#000000', 0.4)};
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
      }
      &:hover {
        &:before,
        .ultra-uplopd-item__remove {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
  .ultra-uplopd-input {
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
  }
`;
