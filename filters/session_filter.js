function validateSession(req, res, next) {
  if(!req.session.session_id) {
    res.redirect('/');
  } else {
    next();
  }
}