import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const INPUT_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange", "onFocus", "onBlur"],
  methods: ["setValue", "clearValue", "focus"],
}
