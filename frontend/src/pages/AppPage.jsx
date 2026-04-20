import React, { useEffect, useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import axios from 'axios';

const AppPage = () => {

  const [text, setText] = useState('');
  const [quotes, setQuotes] = useState([]);

  const [editingId, setEditingID] = useState(null);
  const [editingText, setEditingText] = useState('');

  const getQuotes = async () => {

    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/quotes`);
    setQuotes(res.data);
  }

  const handleSubmit = async ()=>{

    if(!text || !text.trim()){
      alert('Please fill the text with your quote');
    }
    else{
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/quotes`,{text});
      getQuotes();
      setText('');
    }
    
  }

  const startEdit = (id,text) => {
    
    setEditingID(id);
    setEditingText(text);
  }

  const handleUpdate = async()=>{

    if(!editingText.trim()){
      
      alert('Please fill the field with quote to edit');
    }
    else{

      await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/quotes/${editingId}`,{
        text:editingText
      });

      setEditingID(null);
      setEditingText('');
      getQuotes();
    }
  }

  const handleCancel = ()=>{

    setEditingID(null);
    setEditingText('');
  }

  const handleDelete = async(id) => {
    
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/quotes/${id}`);
    getQuotes();
  }

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className='app-page min-h-screen bg-linear-to-br from-purple-100 to-pink-100 px-4 md:px-10 py-15'>
      <h1 className='text-3xl font-bold text-center mb-5'>📝My Quotes</h1>

      {/* Input form */}
      <div className='flex justify-center gap-3 items-center mb-7'>
        <input type="text" placeholder='Type your quote here...' className='max-w-xl w-full py-1.5 px-4 rounded-md shadow-md border-gray-400 border' onChange={(e)=>setText(e.target.value)} value={text}/>
        <button className='bg-blue-700 text-white px-3 py-1.5 rounded-xl hover:bg-blue-400 hover:text-black font-semibold hover:cursor-pointer' onClick={handleSubmit}>Submit</button>
      </div>

      {/*Quote list */}
      <div className='max-w-2xl mx-auto space-y-5'>
        {quotes.map((q) => (
          <div key={q._id} className='bg-white px-3 py-3 flex flex-col rounded-md shadow-xl'>
            {editingId === q._id ?(
              <div className='flex items-center gap-2'>
                <input type="text" className='w-full px-4 py-1.5 border rounded-lg' onChange={(e)=>setEditingText(e.target.value)} value={editingText} />
                <button className='px-3 py-1.5 rounded-xl bg-green-500 hover:bg-green-300 hover:cursor-pointer' onClick={handleUpdate}>Save</button>
                <button className='px-3 py-1.5 rounded-xl bg-gray-500 hover:bg-gray-300 hover:cursor-pointer' onClick={handleCancel}>Cancel</button>
              </div>
            ) :(
              <div className='flex w-full justify-between item-center gap-2'>
              <p>{q.text}</p>
              <div className='flex gap-5'>
                <div className='flex gap-1 items-center text-blue-500 hover:text-blue-800 hover:cursor-pointer' onClick={()=>startEdit(q._id,q.text)}>
                  <Pencil size={20} /><span>Edit</span>
                </div>
                <div className='flex gap-1 items-center text-red-500 hover:text-red-800 hover:cursor-pointer' onClick={() => handleDelete(q._id)}>
                  <Trash size={20} /><span>Delete</span>
                </div>
              </div>
            </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AppPage