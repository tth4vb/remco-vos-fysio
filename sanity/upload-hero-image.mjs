import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'gmbzo7lj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

async function uploadHeroImage() {
  const imagePath = path.join(process.cwd(), '..', 'public', 'sport_massage.png')
  
  console.log('Uploading image from:', imagePath)
  
  // Upload the image asset
  const asset = await client.assets.upload('image', createReadStream(imagePath), {
    filename: 'sport_massage.png'
  })
  
  console.log('Image uploaded, asset ID:', asset._id)
  
  // Update the homePage document with the new image
  const result = await client
    .patch('homePage')
    .set({
      heroBackgroundImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      }
    })
    .commit()
  
  console.log('homePage updated with new hero image')
  return result
}

uploadHeroImage()
  .then(() => console.log('Done!'))
  .catch(err => console.error('Error:', err.message))
