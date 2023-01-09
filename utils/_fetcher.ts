/**
 * Method for fetch APIs
 * setData allways return Array object
 *
 * @function
 */

export type PropsFetcher = {
  url: string
  method?: string
  data?: any
  headers?: {}
}

const fetcher = async ({
  url,
  method = 'get',
  data,
  headers,
}: PropsFetcher) => {
  try {
    let response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        ...headers,
      },
      method,
    })
    let json = await response.json()
    return json
  } catch (e: any) {
    // console.log(e)
    return null
  }
}

export default fetcher