import { ReadAllFilesProps } from "./interfaces";

export const readFilesAsDataUrl = (file: File) =>
new Promise((resolve, reject) => {
const fileReader = new FileReader();
fileReader.onload = (e) => resolve({dataUrl: e.target!.result, file:file});
fileReader.onerror = () => reject(fileReader);
fileReader.readAsDataURL(file);
})

export const readAllFiles = async (props: ReadAllFilesProps) => {

  const {files, useFor, images, setImages} = props

  if (!files || !files[0]) return

  const clone = [...images]

  if (useFor === 'featured') {
    const thisImage:any = await readFilesAsDataUrl(files[0])
    clone[0] = { url: '', dataUrl: thisImage['dataUrl'], file: files[0]}
    return setImages('images', clone)
  }
    
  const readers = []

  for (let i = 0; i < files.length; i++) readers.push(readFilesAsDataUrl(files[i]))

    const values = await Promise.all(readers)
  values.forEach((val:any) => { 
      if (typeof (val) !== 'object') return 
      clone.push({ url: '', dataUrl: val['dataUrl'], file: val['file']})
     })
    setImages('images', clone)
}