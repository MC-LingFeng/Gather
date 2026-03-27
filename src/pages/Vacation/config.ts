export const regExpKeys =[
  '省',
  '市',
  '区',
  '自治区',
  '县',
  '城'
]

export const formatMessage = (message: any) => {
  if (!message) return []
  if (!Array.isArray(message)) return []
  if (message.length === 0) return []
  
  return message?.map((item) => {
    
    if (item.id.includes('SystemMessage')) {
      
      return {
        name: 'SystemMessage',
        content: item.content
      }
    } else if (item.id.includes('HumanMessage')) {
      
      return {
        name: 'HumanMessage',
        content: item.kwargs.content
      }
    } else if (item.id.includes('AIMessage')) {
      
      return {
        name: 'AIMessage',
        content: item.kwargs.content
      }
    } else if (item.id.includes('ToolMessage')) {
      
      return {
        name: 'ToolMessage',
        content: item.kwargs.content
      }
    } else {
      return {
        name: 'Other',
        content: item.kwargs.content
      }
    }
  })
}