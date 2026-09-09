import type { SVGProps } from 'react'
import type { SkillModule } from '../../types/content'

type IconProps = SVGProps<SVGSVGElement>

export function VueIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="Vue.js" {...props}>
      <path fill="#41B883" d="M78.8 10 64 35.4 49.2 10H0l64 110 64-110z" />
      <path fill="#35495E" d="M78.8 10 64 35.4 49.2 10H25.6L64 76l38.4-66z" />
    </svg>
  )
}

export function ReactIcon(props: IconProps) {
  return (
    <svg viewBox="-12 -11 24 22" role="img" aria-label="React" {...props}>
      <circle r="2.05" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth={1}>
        <ellipse rx="10.5" ry="4.1" />
        <ellipse rx="10.5" ry="4.1" transform="rotate(60)" />
        <ellipse rx="10.5" ry="4.1" transform="rotate(120)" />
      </g>
    </svg>
  )
}

export function NextIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="Next.js" {...props}>
      <circle cx="64" cy="64" r="60" fill="#0B0D0F" />
      <clipPath id="nxc">
        <circle cx="64" cy="64" r="60" />
      </clipPath>
      <g clipPath="url(#nxc)" fill="#FFFFFF">
        <rect x="42" y="38" width="9" height="52" />
        <polygon points="42,38 53,38 96,104 85,104" />
        <rect x="79" y="38" width="9" height="28" />
      </g>
    </svg>
  )
}

export function FlutterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="Flutter" {...props}>
      <path fill="#02569B" d="M69 8 22 55l16 16L101 8z" />
      <path fill="#13B9FD" d="M69 71 38 102l16 16 47-47H69z" />
      <path fill="#02569B" d="m54 87 15 15 32-32H86z" opacity=".55" />
    </svg>
  )
}

export function DartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="Dart" {...props}>
      <path fill="#00B4AB" d="M8 34 60 8l60 26-34 34z" />
      <path fill="#0175C2" d="m120 34-34 34-34 34 34 18z" />
      <path fill="#00D2B8" d="m52 68-44-34v58l30 30h50z" opacity=".9" />
    </svg>
  )
}

export function TailwindIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="Tailwind CSS" {...props}>
      <path
        fill="#38BDF8"
        d="M64 25.6c-17 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.7 12.2 8.7 6.3 6.4 13.6 13.9 29.4 13.9 17 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.7-6.3-6.4-13.5-13.9-29.4-13.9zM32 64C15 64 4.3 72.5 0 89.6c6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.7 6.3 6.4 13.6 13.9 29.4 13.9 17 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.7C55.1 71.5 47.9 64 32 64z"
      />
    </svg>
  )
}

export function LaragonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="Laragon" {...props}>
      <circle cx="64" cy="64" r="56" fill="#0E83CD" />
      <path d="M64 8a56 56 0 0 1 0 112z" fill="#0A6BAA" />
      <path fill="#FFF" d="M48 32h13v52h30v12H48z" />
      <circle cx="86" cy="42" r="9" fill="#8FD6FF" />
    </svg>
  )
}

export function XamppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="XAMPP" {...props}>
      <rect x="6" y="6" width="116" height="116" rx="26" fill="#FB7A24" />
      <path fill="#FFF" d="m40 34 24 26 24-26h18L76 70l30 34H88L64 78l-24 26H22l30-34L22 34z" />
    </svg>
  )
}

export function MysqlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="MySQL" {...props}>
      <path
        fill="#00618A"
        d="M18 100c16-42 44-68 92-74-12 22-10 48 6 66-32 6-60 2-82-12 8 12 18 20 30 24-18 6-34 4-46-4z"
      />
      <path fill="#E48E00" d="M36 96c16 5 34 5 50-2l5 9c-18 7-38 7-56 0z" />
    </svg>
  )
}

export function FirebaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="Firebase" {...props}>
      <path fill="#FFA000" d="M23 101 39 9l15 27z" />
      <path fill="#F57C00" d="M23 101 39 9l38 65z" />
      <path fill="#FFCA28" d="M23 101 77 74l16 19-39 19z" />
    </svg>
  )
}

export function GcpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" role="img" aria-label="Google Cloud Platform" {...props}>
      <defs>
        <clipPath id="gcpc">
          <path d="M97 54a34 26 0 0 0-64-9 25 25 0 1 0-5 49h68a20 20 0 0 0 1-40z" />
        </clipPath>
      </defs>
      <g clipPath="url(#gcpc)">
        <rect x="0" y="0" width="64" height="64" fill="#EA4335" />
        <rect x="64" y="0" width="64" height="64" fill="#4285F4" />
        <rect x="0" y="64" width="64" height="64" fill="#FBBC05" />
        <rect x="64" y="64" width="64" height="64" fill="#34A853" />
      </g>
    </svg>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- lookup map belongs next to the icons it indexes
export const stackIcons: Record<SkillModule['icon'], (props: IconProps) => React.JSX.Element> = {
  vue: VueIcon,
  react: ReactIcon,
  next: NextIcon,
  tailwind: TailwindIcon,
  flutter: FlutterIcon,
  dart: DartIcon,
  laragon: LaragonIcon,
  xampp: XamppIcon,
  mysql: MysqlIcon,
  firebase: FirebaseIcon,
  gcp: GcpIcon,
}
