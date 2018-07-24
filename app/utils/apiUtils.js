export const parseErrors = (errArr) => {
  return errArr.map((err => err.detail))
}
export const parseDreams = (dreamArr) => {
  return dreamArr.map((dream) => {
    return {
      _id: dream.id,
      title: dream.attributes['title'],
      entry: dream.attributes['entry'],
      author: dream.attributes['author'],
      createdAt: dream.attributes['created-at'],
      tags: dream.attributes['tags'],
      updatedAt: dream.attributes['updated-at']
    }
  })
}
