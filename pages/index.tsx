import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Imgix from 'react-imgix'

import fetcher from '../utils/_fetcher'
import { useUpdateState } from '../utils/_hooks'
import styles from '../styles/Home.module.css'

import type { GetStaticProps } from 'next'

type Img = { url: string; name: string }
type Option = { id: string; name: string }
type Props = { imgList: Array<Img>; rendering: any }

const { API_URL, IMGIX_SAMPLE_LIST } = process.env

export default function Imgixpage({ imgList, rendering }: Props) {
  const [imgs, setImgs] = useState<Array<Img>>(imgList)
  const [renderValues, setRenderValues] = useState([])
  const [defaultValue, setDefaultValue] = useState(0)
  const [imgixParams, setImgixParams] = useUpdateState({ rot: 0 })
  const [inputType, setInputType] = useState<{ id: string; type: string; values?: Array<Option> } | undefined>()
  const [imgSelected, setImg] = useState<string | null>(null)

  useEffect(() => {
    setRenderValues(rendering)
  }, [rendering])

  const addImg = ({ target: { id, value } }: any) => {
    setImgs((prev: any) => [
      {
        url: value,
        name: id,
      }, ...prev
    ])
  }
  const setInput = async ({ id, type, values }: any) => {
    setInputType(undefined)
    const def = imgixParams[id]
    if (def) {
      setDefaultValue(def)
    }
    setTimeout(() => {
      setInputType({ id, type, values })
    }, 100)
  }
  const updateParams = ({ target: { id, value } }: any) => setImgixParams({ [id]: Number(value) ?? value })
  const Input = () => {
    switch (inputType?.type) {
      case 'range':
        return (
          <div className={styles.ranger}>
            <input {...inputType} min={-100} max={100} defaultValue={defaultValue} className={styles.range} onChange={updateParams} />
          </div>
        )
      case 'select':
        return (
          <select className={styles.select} id={inputType.id} onChange={updateParams}>
            {inputType?.values?.map(({ id, name }: Option) => (<option key={id} value={id}>{name}</option>))}
          </select>
        )
    }
  }

  return (
    <>
      <Head>
        <title>NanLabs - Imgix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <h2>Images availables</h2>
          <ul className={styles.ul}>
            {
              imgs.map(({ url, name }: Img, index: number) => (<li key={index} className={styles.li}>
                <button className={url === imgSelected ? styles.opacity02 : styles.button} id={url} onClick={() => setImg(url)}>
                  <Image
                    src={url}
                    alt={name.replace(/.jpg/gi, '')}
                    width={150}
                    height={100}
                    priority
                  />
                </button>
              </li>))
            }
          </ul>
        </aside>
        <section className={styles.section}>
          <article className={styles.article}>
            <p>
              The test API only allows use images hosted on the providers hosting, as an example you can use the following:
              <br />
              <b>https://assets.imgix.net/unsplash/goldengate.jpg</b>
            </p>
            <input type="text" id="newImg" className={styles.input} placeholder="Load your image" onBlur={addImg} />
            <div style={{ display: imgSelected ? 'block' : 'none' }}>
              {
                Object.keys(renderValues)?.length > 0 && (
                  <>
                    <h3 className={styles.title}>Effects availables</h3>
                    {
                      Object.keys(renderValues).map((key: any, index: number) => (
                        <Fragment key={index}>
                          <h4 className={styles.title}>{key}</h4>
                          {(renderValues[key] as []).map((
                            { id, name, type, options }:
                              { id: string; name: string; type: string; options?: Array<Option> }
                          ) => (
                            <button
                              key={id}
                              id={id}
                              className={imgixParams[id] ? `${styles.paramBtn} ${styles.paramBtnActive}` : styles.paramBtn}
                              onClick={() => setInput({ id, type, values: options })}
                            >{name} {imgixParams[id] !== 0 && imgixParams[id]}</button>
                          ))}
                        </Fragment>
                      ))
                    }
                  </>
                )
              }
              <br /><br />
              {inputType && Input()}
            </div>
          </article>
          <article style={{ textAlign: 'center' }}>
            {imgSelected && <Imgix
              height={500}
              width={500}
              src={imgSelected}
              imgixParams={imgixParams}
              className={styles.imgix}
            />}
          </article>
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const imgList = await fetcher({
    url: IMGIX_SAMPLE_LIST as string
  })
  const rendering = await fetcher({
    url: `${API_URL}/rendering`
  })
  return {
    props: { imgList, rendering },
    revalidate: 10,
  }
}
