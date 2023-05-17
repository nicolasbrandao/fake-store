export type ImageWidthsWithBreakpointsProps = {
  small: string
  medium: string
  large: string
}

export default function makeImageSizes({
  small,
  medium,
  large,
}: ImageWidthsWithBreakpointsProps) {
  return `(max-width: 768px) ${small}, (max-width: 1024px) ${medium}, ${large}`
}
