/* eslint-disable semi */

export function createModal(content) {

  content = (content === undefined) ? 'no content' : content;

  var modal = document.createElement('div');
  document.body.appendChild(modal);
  modal.setAttribute('id', 'myModal');
  modal.setAttribute('class', 'modal');

  var modalContent = document.createElement('div');
  modal.appendChild(modalContent);
  modalContent.setAttribute('class', 'modal-content');
  modalContent.innerHTML = content;

  var closeBtn = document.createElement('span');
  modalContent.appendChild(closeBtn);
  closeBtn.setAttribute('class', 'close');
  closeBtn.innerHTML = '&times;';

  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = function () {
    modal.remove();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.remove();
    }
  }

}