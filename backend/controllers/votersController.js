const Voters = require('../models/votersModel');

exports.getAllVoters = (req, res) => {
    const { id } = req.params;
    const { user_id } = req.query;
    console.log(req.query, 'voter', id);

    if (id) {
        Voters.getSingleVoter(id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.length === 0) {
                return res.status(404).json({ message: 'No voter found' });
            }
            res.status(200).send(result);
        });
    }
    else if (user_id) {
        console.log('first')
        Voters.getSingleVoterByUserId(user_id, (err, result) => {
            console.log('result', result, err)
            if (err) return res.status(500).send(err);
            // if (result.length === 0) {
            //     return res.status(200).send('Voter is not yet registered');
            // }
            res.status(200).send(result);
        })
    }

    else {
        Voters.getAll((err, data) => {
            if (err) return res.status(500).send(err);
            else res.send(data, 'voters data');
        });
    }
};


exports.createVoter = (req, res) => {
    const data = req.body;
    const { voter_name, aadhar_id, DOB, gender, email, contact_no, address, is_registered, nationality, user_id } = data;

    for (key in data) {
        if (!data[key]) {
            return res.status(400).json({ error: `Missing ${key}` })
        }
    }
    console.log(res.error)
    Voters.createVoter(voter_name, aadhar_id, DOB, gender, email, contact_no, address, is_registered, nationality, user_id, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Voter created successfully',
            voter: result
        });
    });
};

exports.updateVoter = (req, res) => {
    const data = req.body;
    const { id } = req.params;
    console.log(data, 'controller')

    for (key in data) {
        if (!data[key]) {
            return res.status(400).json({ error: `Missing ${key}` })
        }
    }
    Voters.updateVoter(id, data, (err, result) => {
        console.log(err ? err : '')
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Voter updated successfully',
            voter: req.body
        });
    })
}


exports.deleteVoter = (req, res) => {
    const { id } = req.params;
    Voters.deleteVoter(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Voter deleted successfully',
            voter: req.body
        });
    })
}



// single voter
exports.getSingleVoter = (req, res) => {
    const { id } = req.params;

    Voters.getSingleVoter(id, (err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
    });
};


exports.getFemaleVotersByCandidateId = (req, res) => {
    const { candidate_id } = req.params;


    Voters.getFemaleVotersByCandidateId(candidate_id, (err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result?.map((i) => i.voter_name));
    })
}

exports.getGenderBasedVoterCount = (req, res) => {
    Voters.getGenderBasedVoterCount((err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
    })
}

exports.getMaleVotersForParliamentElection = (req, res) => {
    Voters.getMaleVotersForParliamentElection((err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result.map((i) => i.voter_name));
    })
}