import { ImageSourcePropType } from 'react-native';
import { ASSETS } from '../../../constants/assets';

export type OnboardingSlide = {
  id: string;
  image: ImageSourcePropType;
  description: string;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    image: ASSETS.onboarding1,
    description: 'Discover all upcoming and past rocket launches of SpaceX.',
  },
  {
    id: '2',
    image: ASSETS.onboarding2,
    description: 'Discover all upcoming and past rocket launches of SpaceX.',
  },
  {
    id: '3',
    image: ASSETS.onboarding3,
    description: 'Discover all upcoming and past rocket launches of SpaceX.',
  },
];