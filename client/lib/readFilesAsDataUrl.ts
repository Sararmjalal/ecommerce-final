import { ReadAllFilesProps } from "./interfaces";

export const readFilesAsDataUrl = (file: File) =>
new Promise((resolve, reject) => {
const fileReader = new FileReader();
fileReader.onload = (e) => resolve(e.target!.result);
fileReader.onerror = () => reject(fileReader);
fileReader.readAsDataURL(file);
})

export const readAllFiles = async (props: ReadAllFilesProps) => {

  const {files, useFor, images, setImages} = props

  if (!files || !files[0]) return

  const clone = [...images]

  if (useFor === 'featured') {
    const thisImage = await readFilesAsDataUrl(files[0])
    if(typeof(thisImage) !== 'string' ) return
    clone[0] = { url: thisImage }
    return setImages('images', clone)
  }
    
  const readers = []

  for (let i = 0; i < files.length; i++) readers.push(readFilesAsDataUrl(files[i]))

    const values = await Promise.all(readers)
    values.forEach(val => { 
      if (typeof (val) !== 'string') return 
      clone.push({ url: val })
     })
    setImages('images', clone)
}