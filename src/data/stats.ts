import type { Stat } from '../types';

export const stats: Stat[] = [
  {
    id: '1',
    label: 'Facebook Followers',
    value: 5000,
    icon: 'FaFacebook',
    platform: 'facebook',
    prefix: '',
    suffix: 'K+',
    trend: 'up',
  },
  {
    id: '2',
    label: 'Instagram Followers',
    value: 48000,
    icon: 'FaInstagram',
    platform: 'instagram',
    prefix: '',
    suffix: 'K+',
    trend: 'up',
  },
  {
    id: '3',
    label: 'Total Views',
    value: 50000000,
    icon: 'FaEye',
    prefix: '',
    suffix: 'M+',
    trend: 'up',
  },
  {
    id: '4',
    label: 'Collaborations',
    value: 100,
    icon: 'FaHandshake',
    prefix: '',
    suffix: '+',
    trend: 'up',
  },
];
