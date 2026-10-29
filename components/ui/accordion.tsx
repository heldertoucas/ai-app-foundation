"use client"

import * as React from "react"
import { CaretDown } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  value?: string
  onValueChange?: (value: string) => void
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextType>({})

function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  children,
  ...props
}: {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const [value, setValue] = React.useState<string | undefined>(defaultValue)

  const handleValueChange = (itemValue: string) => {
    if (value === itemValue && collapsible) {
      setValue(undefined)
    } else {
      setValue(itemValue)
    }
  }

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, collapsible }}>
      <div data-slot="accordion" className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  value,
  className,
  children,
  ...props
}: {
  value: string
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="accordion-item"
      data-value={value}
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(AccordionContext)
  const item = React.useRef<HTMLButtonElement>(null)

  const getItemValue = () => {
    return item.current?.closest("[data-slot='accordion-item']")?.getAttribute("data-value") || ""
  }

  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const val = getItemValue()
    setIsOpen(context.value === val)
  }, [context.value])

  return (
    <div className="flex">
      <button
        ref={item}
        type="button"
        data-slot="accordion-trigger"
        data-state={isOpen ? "open" : "closed"}
        onClick={() => {
          const val = getItemValue()
          context.onValueChange?.(val)
        }}
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <CaretDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </button>
    </div>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(AccordionContext)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const itemVal = contentRef.current?.closest("[data-slot='accordion-item']")?.getAttribute("data-value")
    setIsOpen(context.value === itemVal)
  }, [context.value])

  if (!isOpen) return null

  return (
    <div
      ref={contentRef}
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      className={cn("overflow-hidden text-sm pt-0 pb-4 animate-in fade-in-50 duration-200", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
