/// <reference types="@emotion/react/types/css-prop" />

declare module '*.svg';
declare module '*.jpg';

interface SpeechRecognitionErrorEvent {
  readonly message: string;
  readonly error:
    | 'no-speech'
    | 'aborted'
    | 'audio-capture'
    | 'network'
    | 'not-allowed'
    | 'service-not-allowed'
    | 'bad-grammar'
    | 'language-not-supported';
}
interface SpeechRecognitionInstance extends Omit<SpeechRecognition, 'onerror'> {
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}
interface Window {
  SpeechRecognition: {
    new (): SpeechRecognitionInstance;
  };
  webkitSpeechRecognition: {
    new (): SpeechRecognitionInstance;
  };
}
