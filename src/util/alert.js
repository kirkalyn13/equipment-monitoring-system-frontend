import Swal from 'sweetalert2'

export const fireAlert = (title, text) => {
    Swal.fire({
        title,
        text,
        confirmButtonText: 'OK',
        confirmButtonColor: '#FFAA00'
      })
}