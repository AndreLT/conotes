import { auth } from '../../../lib/firebase-admin'

import {getTotalNotes} from '../../../lib/firestore-admin'

export default async (req, res) => {
  try{
    const user = await auth.verifyIdToken(req.headers.token);

    const info = await getTotalNotes(user.uid);
    
    res.status(200).json(info);
  }catch(error){
    console.log(error)
    res.status(500).json({error});
  }

}
