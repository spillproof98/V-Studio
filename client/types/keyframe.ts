export type Keyframe<T> = {
  time: number;
  value: T;
};

export type AnimatedProperty<T> = {
  keyframes: Keyframe<T>[];
};
