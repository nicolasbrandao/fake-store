import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function LoadingSpinner() {
  return (
    <div role="status" aria-live="polite">
      <AiOutlineLoading3Quarters className="text-white text-4xl animate-spin" />
    </div>
  )
}
