import Swal from 'sweetalert2'

export const confirmDialog = async (title, text) => {
    return Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFAA00",
      cancelButtonColor: "#d757575",
      confirmButtonText: "Yes, Proceed"
    }).then((result) => {
      return result.isConfirmed
    })
}