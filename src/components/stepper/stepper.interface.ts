export interface StepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}
