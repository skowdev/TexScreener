import axios from 'axios';
import FormData from 'form-data';

const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjMTc5MWRmOC02OGNlLTQ1NmMtOTlkMC0wNDA5NDQxYmJjMjMiLCJlbWFpbCI6ImVmbG9vd0Bob3RtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3ZmRkYzc1OThmNGVjODRiOWE3NiIsInNjb3BlZEtleVNlY3JldCI6IjJhMzQzMzdmNjU5NTIzYzE2OGI0MDUxZjg0YTg4YTNkMzliZDg4Y2I4MDJhZGJkYTAyZGRlYTBmNDRiYThmNDQiLCJleHAiOjE3NzcwNTEzNjh9.hbUc4_ArHjnXU_gE15kFLaWYQHYOEYdfTt5LzdDc9uI';

const pinataApiUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export const uploadToPinata = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(pinataApiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw new Error('Failed to upload image');
  }
};