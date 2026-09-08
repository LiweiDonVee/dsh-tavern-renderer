export const SHADOW_PRIORITY = -100
export const RENDERED_NODE_KEYS = Object.freeze(['assistant-step', 'user', 'steering'])

/** Register reversible keyed replacements after ui-chat declares the slot. */
export function registerTavernRenderers(ctx, components, createInject) {
  const disposers = []
  for (const key of RENDERED_NODE_KEYS) {
    const component = key === 'assistant-step' ? components.assistant : components.user
    const disposeInjection = ctx.slots.inject('conversation.chat.node', () => ctx.slots.register({
      name: 'conversation.chat.node',
      key,
      priority: SHADOW_PRIORITY,
      locale: 'chat',
      inject: createInject,
    }, component))
    if (typeof disposeInjection === 'function') disposers.push(disposeInjection)
  }
  return () => {
    for (const dispose of disposers.splice(0).reverse()) dispose()
  }
}
