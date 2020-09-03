import { auth } from '../../lib/firebase-admin'

import {getUserNotes} from '../../lib/firestore-admin'

export default async (req, res) => {
  const user = await auth.verifyIdToken(req.headers.token);
  const {notes, error} = await getUserNotes(user.uid);
  if(error){
    res.status(500).json({error});
  }

  res.status(200).json({notes});
}
