const Candidates = require("../models/candidatesModel");

exports.getAllCandidates = (req, res) => {
    Candidates.getAll((err, data) => {
        if (err) res.status(500).send(err)
        else res.status(200).send(data, 'data')
    })
};

exports.createCandidate = (req, res) => {
    const data = req.body;
    const { candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type } = data;

    for (key in data) {
        if (!data[key]) {
            return res.status(400).json({ error: `Missing ${key}` })
        }
    }

    Candidates.createCandidate(candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Candidate created successfully',
            Candidate: req.body
        });
    });
};

exports.deleteCandidate = (req, res) => {
    const { id } = req.params;
    Candidates.deleteCandidate(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Candidate deleted successfully',
            voter: req.body
        });
    })
}

exports.updateCandidate = (req, res) => {
    const data = req.body;
    const { id } = req.params;

    for (key in data) {
        if (!data[key]) {
            return res.status(400).json({ error: `Missing ${key}` })
        }
    }
    Candidates.updateCandidate(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Candidate data updated successfully',
            voter: req.body
        });
    })
}

exports.getCandidateById = (req, res) => {
    const { id } = req.params;

    Candidates.getCandidateById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).send(result)
    })
}


exports.getCandidateNameByElectionType = (req, res) => {
    const { election_type } = req.params;

    Candidates.getCandidateNameByElectionType(election_type, (err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result.map((i) => i.candidate_name))
        // res.status(200).send(result)
    })
};


exports.getCandidatesCountByElectionType = (req, res) => {
    const { election_type } = req.params;
    console.log('second')
    Candidates.getCandidatesCountByElectionType(election_type, (err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
    })
}

exports.getCandidatesAgedForParliament = (req, res) => {
    Candidates.getCandidatesAgedForParliament((err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result.map((i) => i.candidate_name));
    })
}