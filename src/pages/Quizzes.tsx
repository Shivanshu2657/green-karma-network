
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Quiz data
const quizzes = [
  {
    id: 1,
    title: "Climate Change Basics",
    description: "Test your knowledge about climate change fundamentals",
    difficulty: "Beginner",
    questions: 5,
    imageIcon: BookOpen,
  },
  {
    id: 2,
    title: "Carbon Footprint",
    description: "Learn about measuring and reducing your carbon footprint",
    difficulty: "Intermediate",
    questions: 8,
    imageIcon: BookOpen,
  },
  {
    id: 3,
    title: "Sustainable Living",
    description: "Discover ways to live more sustainably",
    difficulty: "Beginner",
    questions: 6,
    imageIcon: BookOpen,
  },
  {
    id: 4,
    title: "Renewable Energy",
    description: "Learn about different forms of renewable energy",
    difficulty: "Advanced",
    questions: 10,
    imageIcon: BookOpen,
  },
];

// Sample questions for Climate Change quiz
const climateChangeQuestions = [
  {
    question: "What greenhouse gas is most responsible for trapping heat in the atmosphere?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 1
  },
  {
    question: "What is the greenhouse effect?",
    options: [
      "The warming of Earth due to trapped heat in the atmosphere",
      "The process of growing plants in greenhouses",
      "The effect of green light on plant growth",
      "The process of recycling glass bottles"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of the following is NOT a consequence of global warming?",
    options: [
      "Rising sea levels",
      "More extreme weather events",
      "Increased snowfall everywhere",
      "Melting glaciers"
    ],
    correctAnswer: 2
  },
  {
    question: "Which human activity contributes most to climate change?",
    options: [
      "Agriculture",
      "Burning fossil fuels",
      "Deforestation",
      "Waste disposal"
    ],
    correctAnswer: 1
  },
  {
    question: "What international agreement aims to combat climate change by limiting global warming?",
    options: [
      "Kyoto Protocol",
      "Montreal Protocol",
      "Paris Agreement",
      "Geneva Convention"
    ],
    correctAnswer: 2
  }
];

type QuizState = "list" | "active" | "result";

const Quizzes = () => {
  const { toast } = useToast();
  const [quizState, setQuizState] = useState<QuizState>("list");
  const [activeQuiz, setActiveQuiz] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const startQuiz = (quizId: number) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setQuizState("active");
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === climateChangeQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, isCorrect]);
    
    if (currentQuestion < climateChangeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizState("result");
      
      // Add a toast notification for quiz completion
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score + (isCorrect ? 1 : 0)} out of ${climateChangeQuestions.length}`,
      });
    }
  };

  const renderQuizList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quizzes.map((quiz) => (
        <Card key={quiz.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{quiz.title}</h3>
              <Badge variant={
                quiz.difficulty === "Beginner" ? "default" :
                quiz.difficulty === "Intermediate" ? "secondary" : "outline"
              }>
                {quiz.difficulty}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{quiz.questions} questions</span>
              <Button 
                onClick={() => startQuiz(quiz.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                Start Quiz
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderActiveQuiz = () => {
    const question = climateChangeQuestions[currentQuestion];
    
    return (
      <Card className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {climateChangeQuestions.length}
            </span>
            <span className="text-sm font-medium">
              Score: {score}/{currentQuestion}
            </span>
          </div>
          <Progress value={(currentQuestion / climateChangeQuestions.length) * 100} />
        </div>
        
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
        
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`
                p-4 border rounded-md cursor-pointer transition-colors
                ${selectedAnswer === index 
                  ? 'bg-green-100 border-green-500' 
                  : 'hover:bg-gray-50'
                }
              `}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleNextQuestion} 
          disabled={selectedAnswer === null}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
        >
          {currentQuestion < climateChangeQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </Card>
    );
  };

  const renderQuizResult = () => (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Award className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">
          You scored {score} out of {climateChangeQuestions.length}
        </p>
        
        <div className="w-full max-w-sm mx-auto mt-4 mb-6">
          <Progress value={(score / climateChangeQuestions.length) * 100} />
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        {climateChangeQuestions.map((q, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0">
              {answers[index] ? (
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="h-4 w-4 text-red-600" />
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">{q.question}</p>
              <p className="text-sm text-gray-600">
                Correct answer: {q.options[q.correctAnswer]}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setQuizState("list")}
          className="flex-1"
        >
          Back to Quizzes
        </Button>
        <Button
          onClick={() => startQuiz(activeQuiz)}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          Try Again
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Environmental Quizzes</h1>
      <p className="text-gray-600 mb-8">Test your knowledge and learn more about environmental issues</p>
      
      {quizState === "list" && renderQuizList()}
      {quizState === "active" && renderActiveQuiz()}
      {quizState === "result" && renderQuizResult()}
    </div>
  );
};

export default Quizzes;
