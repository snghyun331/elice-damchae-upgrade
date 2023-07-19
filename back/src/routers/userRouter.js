import express from 'express';

const router = express.Router();

// app이 아닌 router!
router.post('/login', (req, res) => {
	// ...
});
router.post('/register', (req, res) => {
	// ...
});

export default router;
