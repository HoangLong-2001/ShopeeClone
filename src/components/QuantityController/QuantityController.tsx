import InputNumber, { type InputNumberProps } from '../InputNumber'
interface IProps extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}
export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  value,
  classNameWrapper = 'ml-10',
  ...rest
}: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value: number = Number(e.target.value)
    if (max && max < _value) {
      _value = max
    }
    onType?.(_value)
  }
  const increase = () => {
    let _value = Number(value) + 1
    if (max && _value > max) {
      _value = max
    }
    onIncrease?.(_value)
  }
  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease?.(_value)
  }
  return (
    <div className={'flex items-center' + classNameWrapper}>
      <button
        className='rounded-1-sm flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600'
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        value={value}
        classNameError='hidden'
        onChange={handleChange}
        classNameInput='h-8 w-14 border-b border-gray-300 border-t text-center p-1 outline-none'
        {...rest}
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
