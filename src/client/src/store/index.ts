import { merge } from 'lodash-es';
import { useLayoutEffect } from 'react';
import { RoleEnum } from 'shared/constants/role.enum';
import { ThemeEnum } from 'shared/constants/theme.enum';
import { BaseUserInfo } from 'shared/interface/user/user-info.interface';
import create, { StoreApi, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';

interface BearState extends BaseUserInfo {
  setUserInfo: (userInfo: Partial<BaseUserInfo>) => void;
  clearUserInfo: () => void;
}

export let store: UseBoundStore<StoreApi<BearState>>;

export const getDefaultInitialState = (cookies = {} as any): Partial<BearState> => ({
  avatar: cookies.avatar || '',
  createTime: cookies.createTime || '',
  id: cookies.id || '',
  lastLoginTime: cookies.lastLoginTime || '',
  nickname: cookies.nickname || '',
  role: (cookies.role as RoleEnum) || RoleEnum.USER,
  token: cookies.token || '',
  updateTime: cookies.updateTime || '',
  url: cookies.url || '',
  username: cookies.username || '',
  verified: cookies.verified ? JSON.parse(decodeURIComponent(cookies.verified)) : false,
  theme: (cookies.theme as ThemeEnum) || ThemeEnum.light,
  socket: cookies.socket || null,
  socketId: null,
});

const zustandContext = createContext<StoreApi<BearState>>();

export const StoreProvider = zustandContext.Provider;

export const useStore = zustandContext.useStore;

export const useStoreApi = zustandContext.useStoreApi;

export const initializeStore = (preloadedState: BearState) => {
  return create<BearState>(set => ({
    ...merge(getDefaultInitialState(), preloadedState),
    setUserInfo: userInfo => {
      set(userInfo);
    },
    clearUserInfo: () => {
      set(getDefaultInitialState());
    },
  }));
};

export function useCreateStore(serverInitialState: BearState) {
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState);
  }
  const isReusingStore = Boolean(store);
  store = store ?? initializeStore(serverInitialState);

  useLayoutEffect(() => {
    if (serverInitialState && isReusingStore) {
      store.setState(merge(store.getState(), serverInitialState), true);
    }
  });

  return () => store;
}
