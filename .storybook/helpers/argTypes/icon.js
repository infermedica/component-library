import icons from "@/components/atoms/UiIcon/icons";

const illustrations = [
      'agreement',
      'agreement-rtl',
      'boy',
      'boy-rtl',
      'lock',
      'no-internet-illustration',
      'no-internet-illustration-rtl',
      'podium',
      'podium-rtl',
      'error-500',
    ]
export const icon = {
  description: 'Use this control to set the icon.',
  table: { category: 'stories controls' },
  control: 'select',
  options: ['', ...icons.filter((icon) => (!illustrations.includes(icon)))]
}
