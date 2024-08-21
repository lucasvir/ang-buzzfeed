import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
	selector: 'app-quiz',
	standalone: true,
	imports: [],
	templateUrl: './quiz.component.html',
	styleUrl: './quiz.component.css',
})
export class QuizComponent {
	title: string = '';
	questions: any;
	questionSelected: any;
	questionIndex: number = 0;
	questionMaxIndex: number = 0;
	answers: string[] = [];
	result: string = '';
	finished: boolean = false;
	quizQuestionsJson: any;

	constructor() {
		if (quizz_questions) {
			this.quizQuestionsJson = quizz_questions;

			this.questions = this.quizQuestionsJson.questions;
			this.questionIndex = 0;
			this.questionMaxIndex = this.questions.length;

			this.title = this.quizQuestionsJson.title;
			this.questionSelected = this.questions[this.questionIndex];
		}
	}

	handlePlayerChoice(value: string) {
		this.answers.push(value);
		this.nextStep();
	}

	nextStep() {
		this.questionIndex++;
		if (this.questionIndex < this.questionMaxIndex) {
			this.questionSelected = this.questions[this.questionIndex];
		} else {
			this.finished = true;
			this.result = this.checkResult(this.answers);
		}
	}

	checkResult(answers: string[]): string {
		let badAnswer = 0;
		let goodAnswer = 0;
		this.answers.forEach((answer) => {
			answer == 'A' ? badAnswer++ : goodAnswer++;
		});

		return badAnswer > goodAnswer
			? this.quizQuestionsJson.results.A
			: this.quizQuestionsJson.results.B;
	}
}
