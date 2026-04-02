import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className='w-full'>
      
      {label && (
        <label className='text-sm font-medium text-gray-700 mb-1 block'>
          {label}
        </label>
      )}

      <Controller
        name={name || 'content'}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          
          <Editor
            apiKey="zt3py1ser3gb107hyg679hdt8gckgefcu4q3lngyoggvmyvc"  // 🔥 ADD YOUR KEY HERE

            value={value || ""}

            init={{
              height: 400,
              menubar: true,

              // ✅ FIXED PLUGINS (SEPARATE)
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'paste',
                'help',
                'wordcount'
              ],

              // ✅ FULL TOOLBAR
              toolbar:
                'undo redo | blocks | bold italic underline strikethrough | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link image media | ' +
                'table | code fullscreen preview | removeformat | help',

              // ✅ ENABLE IMAGE TOOL
              image_title: true,
              automatic_uploads: true,

              // (basic image support without backend upload)
              file_picker_types: 'image',

              file_picker_callback: function (cb, value, meta) {
                if (meta.filetype === 'image') {
                  const input = document.createElement('input')
                  input.setAttribute('type', 'file')
                  input.setAttribute('accept', 'image/*')

                  input.onchange = function () {
                    const file = this.files[0]
                    const reader = new FileReader()

                    reader.onload = function () {
                      cb(reader.result, { title: file.name })
                    }

                    reader.readAsDataURL(file)
                  }

                  input.click()
                }
              },

              // ✅ STYLE
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}

            onEditorChange={(content) => onChange(content)}
          />
        )}
      />
    </div>
  )
}

export default RTE