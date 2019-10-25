import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import actions from 'actions';
import selectors from 'selectors';

import './FilePickerHandler.scss';

const supportedClientOnlyExtensions = [
  'pdf',
  'jpg',
  'jpeg',
  'png',
  'docx',
  'xlsx',
  'pptx',
  'md',
  'xod',
];

const FilePickerHandler = () => {
  const isDisabled = useSelector(
    state => selectors.isElementDisabled(state, 'filePickerHandler'),
    shallowEqual,
  );
  const dispatch = useDispatch();

  const openDocument = e => {
    const file = e.target.files[0];
    if (file) {
      dispatch(actions.openElement('progressModal'));
      dispatch(actions.closeElement('menuOverlay'));
      window.docViewer.loadDocument(file);
    }
  };

  return isDisabled ? null : (
    <div className="FilePickerHandler">
      <input
        id="file-picker"
        type="file"
        accept={supportedClientOnlyExtensions.join(', ')}
        onChange={openDocument}
      />
    </div>
  );
};

export default FilePickerHandler;
