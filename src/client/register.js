export const SHADOW_PRIORITY = -100
export const RENDERED_NODE_KEYS = Object.freeze(['assistant-step', 'user', 'steering'])

function disposeRegistrations(value) {
  if (typeof value === 'function') {
    value()
    return
  }
  if (value === null || value === undefined || typeof value[Symbol.iterator] !== 'function') return
  for (const dispose of value) if (typeof dispose === 'function') dispose()
}

/** Register reversible keyed replacements after ui-chat declares the slot. */
export function registerTavernRenderers(ctx, components, createInject) {
  // Inject effects may return an iterable of entry disposers. Keeping the
  // keyed renderers in one declaration effect makes re-declaration and unload
  // atomic, so a Session slot cannot retain a partial renderer set.
  const disposeInjection = ctx.slots.inject('conversation.chat.node', () => RENDERED_NODE_KEYS.map(key => {
    const component = key === 'assistant-step' ? components.assistant : components.user
    return ctx.slots.register({
      name: 'conversation.chat.node',
      key,
      priority: SHADOW_PRIORITY,
      locale: 'chat',
      inject: createInject,
    }, component)
  }))
  return () => {
    disposeRegistrations(disposeInjection)
  }
}
