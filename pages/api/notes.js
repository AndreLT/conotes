import { auth } from '../../lib/firebase-admin'

import {getUserNotes} from '../../lib/firestore-admin'

export default async (req, res) => {
  try{
    const user = await auth.verifyIdToken(req.headers.token);
    const {notes} = await getUserNotes(user.uid);

    res.status(200).json({notes});
  }catch(error){
    res.status(500).json({error});
  }

}
