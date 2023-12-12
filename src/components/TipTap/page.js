'use client';
import React, { useEffect } from 'react';
import { BiBold,  BiUnderline } from "react-icons/bi";
import { CgFormatItalic } from "react-icons/cg";
import { MdFormatListBulleted } from "react-icons/md";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from "react-icons/lu";
import { PiParagraphFill } from "react-icons/pi";

import { GoListOrdered } from "react-icons/go";
import { TbBlockquote } from "react-icons/tb";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import Underline from "@tiptap/extension-underline";

export  const TipTap = ({setDesc}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'p-3 border border-solid min-h-[16rem] max-h-[16rem] outline-none overflow-y-auto prose max-w-none',
      },
      transformPastedText(text) {
        return text.toUpperCase()
      }
    },
     
    extensions: [
     StarterKit, Underline, 
    ],

    content: `<p> </p>`,
    onUpdate: ({editor}) => {
      const text = editor.getText()
        setDesc(text);
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div>
      <section className="flex flex-wrap gap-4 items-center border border-gray-300 p-3">
      <button type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'bg-gray-200 rounded-sm' : ''}
      >
        <BiBold className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'bg-gray-200 rounded-sm' : ''}
      >
        <CgFormatItalic className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
        className={editor.isActive('underline') ? 'bg-gray-200 rounded-sm' : ''}
      >
        <BiUnderline className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'bg-gray-200 rounded-sm' : ''}
      >
        <PiParagraphFill className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 rounded-sm' : ''}
      >
        <LuHeading1 className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 rounded-sm' : ''}
      >
        <LuHeading2 className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 rounded-sm' : ''}
      >
        <LuHeading3 className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'bg-gray-200 rounded-sm' : ''}
      >
        <LuHeading4 className="text-xl"/>
      </button>
      
      <button type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-200 rounded-sm' : ''}
      >
        <MdFormatListBulleted className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-gray-200 rounded-sm' : ''}
      >
        <GoListOrdered className="text-xl"/>
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-gray-200 rounded-sm' : ''}
      >
        <TbBlockquote className="text-xl"/>
      </button>

      </section>
      <EditorContent editor={editor}  className="font-normal" />
    </div>
  )
}

export default TipTap