import express from 'express';
const router = express.Router();
import pool from '../dbcon.js';

// Get all employees
router.get('/', function (req, res, next) {
      var context = {};
      pool.query('SELECT * FROM EMPLOYEE', function (err, rows, fields) {
            if (err) {
                  next(err);
                  return;
            }
            context.results = JSON.stringify(rows);
            res.json(context.results);
      });
});

// GET ALL projects
router.get('/projects', function (req, res, next) {
      var context = {};
      pool.query('SELECT * FROM PROJECT', function (err, rows, fields) {
            if (err) {
                  next(err);
                  return;
            }
            context.results = JSON.stringify(rows);
            res.json(context.results);
      });
});

// GET all employees who work on project pno
router.get('/:pno', function (req, res, next) {
      var context = {};
      var pno = req.params.pno;
      pool.query('SELECT Essn FROM WORKS_ON WHERE WORKS_ON.Pno = ?', [pno], function (err, rows, fields) {
            if (err) {
                  next(err);
                  return;
            }

            var ssnArray = rows.map((row) => row.Essn);
            pool.query('SELECT * FROM EMPLOYEE WHERE EMPLOYEE.Ssn IN (?)', [ssnArray], function (err, rows, fields) {
                  if (err) {
                        next(err);
                        return;
                  }
                  context.results = JSON.stringify(rows);
                  res.json(context.results);
            });
      });

});

// Search for employee by first name
router.get('/search/:name', function (req, res, next) {
      var context = {};
      var fname = req.params.name;
      var firstChar = fname.charAt(0);
      pool.query('SELECT * FROM EMPLOYEE WHERE EMPLOYEE.Fname LIKE ?', [firstChar + '%'], function (err, rows, fields) {
            if (err) {
                  next(err);
                  return;
            }
            context.results = JSON.stringify(rows);
            res.json(context.results);
      });
});

export default router;