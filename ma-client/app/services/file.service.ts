import axios from 'api/interceptors'

export const FileService = {
  async upload(files: FormData, folder?: string) {
    return axios.post<{ url: string; name: string }[]>('files', files, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
