import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Save, Send } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import Toolbar from '../components/Toolbar';
import AutoSaveIndicator from '../components/AutoSaveIndicator';

const Editor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveDraft, publishBlog, getBlog } = useBlog();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [initialContent, setInitialContent] = useState('');
  const [lastSavedContent, setLastSavedContent] = useState('');
  const [lastSavedTitle, setLastSavedTitle] = useState('');
  const [lastSavedTags, setLastSavedTags] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your blog post...'
      })
    ],
    content: initialContent,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none'
      }
    }
  });

  useEffect(() => {
    if (id) {
      getBlog(id).then(blog => {
        setTitle(blog.title);
        setTags(blog.tags.join(', '));
        setInitialContent(blog.content);
        setLastSavedContent(blog.content);
        setLastSavedTitle(blog.title);
        setLastSavedTags(blog.tags.join(', '));
        editor?.commands.setContent(blog.content);
      });
    }
  }, [id, getBlog, editor]);

  const hasChanges = useCallback(() => {
    if (!editor) return false;
    const currentContent = editor.getHTML();
    return currentContent !== lastSavedContent || 
           title !== lastSavedTitle || 
           tags !== lastSavedTags;
  }, [editor, lastSavedContent, lastSavedTitle, lastSavedTags, title, tags]);

  const saveContent = useCallback(
    async (content: string) => {
      if (!content.trim() && !title.trim()) return;
      if (!hasChanges()) return;

      setSaveStatus('saving');
      try {
        const savedBlog = await saveDraft({
          _id: id,
          title: title || 'Untitled',
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
        });
        setLastSavedContent(content);
        setLastSavedTitle(title);
        setLastSavedTags(tags);
        setSaveStatus('saved');
      } catch (error) {
        setSaveStatus('idle');
      }
    },
    [id, title, tags, hasChanges, saveDraft]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (editor && hasChanges()) {
        saveContent(editor.getHTML());
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [editor, hasChanges, saveContent]);

  const handlePublish = async () => {
    if (!editor) return;

    try {
      const blog = await publishBlog({
        _id: id,
        title: title || 'Untitled',
        content: editor.getHTML(),
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Failed to publish:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags (comma-separated)..."
              className="w-full mt-2 text-sm text-gray-500 border-none focus:outline-none focus:ring-0"
            />
          </div>
          
          <Toolbar editor={editor} />
          
          <div className="p-4">
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <AutoSaveIndicator status={saveStatus} />
          
          <div className="flex gap-4">
            <button
              onClick={() => editor && saveContent(editor.getHTML())}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50"
            >
              <Save className="w-5 h-5" />
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;