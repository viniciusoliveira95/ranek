export const serialize = (queryObj) => {
  let queryString = ""

  for (let key in queryObj) {
    queryString += `&${key}=${queryObj[key]}`
  }

  return queryString
}

export function mapFields(options) {
  const object = {};

  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]]

    object[field] = {
      get() {
        return this.$store.state[options.base][field]
      },

      set(value) {
        this.$store.commit(options.mutation, { [field]: value })
      }
    }
  }

  return object;
}