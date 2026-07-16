import test from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../data/questions.js';
import { canChangeUsername, fieldCounts, isPassing, nextCertificateNumber, normalizeUsername, remainingAttempts, selectQuestions, tokyoDateKey } from './rules.js';
import { maskEmail } from './domain.js';

test('scoring and pass threshold',()=>{ assert.equal(isPassing(84),true); assert.equal(isPassing(83),false); });
test('field quotas and unseen priority',()=>{ const selected=selectQuestions(questions,new Set(questions.slice(0,3).map(q=>q.id)),()=>0.5); assert.equal(selected.length,10); assert.deepEqual(fieldCounts(selected),{ict:3,ai:6,integrated:1}); assert.equal(selected.every(q=>!['l1-q01','l1-q02','l1-q03'].includes(q.id)),true); });
test('username normalization and 30 day limit',()=>{ assert.equal(normalizeUsername(' Ａlice '),'alice'); assert.equal(canChangeUsername(new Date('2026-01-01'),new Date('2026-01-31')),true); assert.equal(canChangeUsername(new Date('2026-01-02'),new Date('2026-01-31')),false); });
test('tokyo date, attempt limit, cert number, masked email',()=>{ assert.equal(tokyoDateKey(new Date('2026-07-15T15:00:00Z')),'2026-07-16'); assert.equal(remainingAttempts(5),0); assert.equal(nextCertificateNumber(1,2026,'A',1),'L1-2026-A-00001'); assert.equal(maskEmail('hiro@wasegaku.ac.jp'),'hi***@wasegaku.ac.jp'); });
