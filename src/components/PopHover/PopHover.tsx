import { arrow, FloatingPortal, limitShift, offset, shift, useFloating, type Placement } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
interface IPopHoverProps {
  children: React.ReactNode
  renderPopHover: React.ReactNode
  className?: string
  initialOpen?: boolean
  placement?: Placement
  as?: React.ElementType
  top?: number
}
export default function PopHover({
  children,
  renderPopHover,
  className,
  initialOpen,
  placement,
  top,
  as: Element = 'div'
}: IPopHoverProps) {
  const arrowRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(initialOpen ?? false)

  const { refs, strategy, middlewareData, x, y } = useFloating({
    placement: placement,
    middleware: [shift({ limiter: limitShift() }), offset(top ?? 6), arrow({ element: arrowRef })]
  })
  const showPropper = () => {
    setIsOpen(true)
  }
  const hidePropper = () => {
    setIsOpen(false)
  }
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPropper} onMouseLeave={hidePropper}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                zIndex: 1000,
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopHover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
