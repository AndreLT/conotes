import { getNote } from '../../../lib/firestore-admin';

export default async (req, res) => {
    try {
        const { noteId } = req.query;
        const { note } = await getNote(noteId);
        
        res.status(200).json({note})
    } catch(error) {
        console.log(error);
        res.status(500).json({error})
    }
}