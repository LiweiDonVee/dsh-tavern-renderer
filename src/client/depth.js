const MESSAGE_KINDS = new Set(['user', 'steering', 'assistant-step'])

/** One shared index per Session; streaming changes reuse order and do not rescan the transcript. */
export function createDepthIndex() {
  let previousOrder
  let previousNodes
  let depths = new Map()
  return snapshot => {
    if (snapshot?.order === previousOrder && snapshot?.nodes === previousNodes) return depths
    previousOrder = snapshot?.order
    previousNodes = snapshot?.nodes
    depths = new Map()
    if (!Array.isArray(previousOrder) || typeof previousNodes?.get !== 'function') return depths
    let depth = 0
    for (let index = previousOrder.length - 1; index >= 0; index -= 1) {
      const key = previousOrder[index]
      if (MESSAGE_KINDS.has(previousNodes.get(key)?.kind)) depths.set(key, depth++)
    }
    return depths
  }
}
