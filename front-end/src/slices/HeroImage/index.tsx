import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroImage`.
 */
export type HeroImageProps = SliceComponentProps<Content.HeroImageSlice>;

/**
 * Component for "HeroImage" Slices.
 */
const HeroImage = ({ slice }: HeroImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for hero_image (variation: {slice.variation}) Slices
    </section>
  );
};

export default HeroImage;
