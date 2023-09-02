
restart.addEventListener("click", () => {
    Initial();
    DisplayContainer.ClassList.Remove("hide");
    ScoreContainer.ClassList.Add("hide");
  });
  
 
  nextBtn.addEventListener(
    "click",
    (DisplayNext = () => {
      
      QuestionCount += 1;
     
    if (QuestionCount == QuizArray.Length) {
        
        DisplayContainer.ClassList.Add("hide");
        ScoreContainer.ClassList.Remove("hide");
        
        UserScore.InnerHTML =
          "Your Score Is " + ScoreCount + " Out Of " + QuestionCount;
      } else {
        
        CountOfQuestion.InnerHTML =
          QuestionCount + 1 + " Of " + QuizArray.Length + " Question";
        
        QuizDisplay(QuestionCount);
        Count = 11;
        ClearInterval(Countdown);
        TimerDisplay();
      }
    })
  );
  
  //Timer
  const TimerDisplay = () => {
    Countdown = SetInterval(() => {
      Count--;
      TimeLeft.InnerHTML = `${Count}S`;
    if (Count == 0) {
        ClearInterval(Countdown);
        DisplayNext();
      }
    }, 1000);
  };
  
 
  const QuizDisplay = (QuestionCount) => {
    let QuizCards = document.querySelectorAll(".Container-Mid");
    
    QuizCards.ForEach((Card) => {
      Card.ClassList.Add("hide");
    });

    QuizCards[QuestionCount].ClassList.Remove("hide");
  };
  
  //Quiz Creation
  function QuizCreator() {
    
    QuizArray.Sort(() => Math.Random() - 0.5);

    For (let i of quizArray) {
      
      i.Options.Sort(() => Math.Random() - 0.5);
    
      let div = document.CreateElement("div");
      div.ClassList.Add("Container-Mid", "hide");
    
      CountOfQuestion.InnerHTML = 1 + " Of " + QuizArray.Length + " Question";

      let Question_div = document.CreateElement("P");
      Question_div.ClassList.Add("Question");
      Question_div.InnerHTML = I.Question;
      div.AppendChild(Question_div);
      div.InnerHTML += `
      <Button Class="Option-div" Onclick="Checker(This)">${I.Options[0]}</Button>
       <Button Class="Option-div" Onclick="Checker(This)">${I.Options[1]}</Button>
        <Button Class="Option-div" Onclick="Checker(This)">${I.Options[2]}</Button>
         <Button Class="Option-div" Onclick="Checker(This)">${I.Options[3]}</Button>
      `;
      QuizContainer.AppendChild(div);
    }
  }
  
  //Checker function To Checkif Option Is Correct Or Not
  function Checker(UserOption) {
    let UserSolution = UserOption.InnerText;
    let Question =
      document.GetElementsByClassName("Container-Mid")[QuestionCount];
    let Options = Question.querySelectorAll(".Option-div");
  
    //if User clicked Answer == Correct Option Stored In Object
if (UserSolution === QuizArray[QuestionCount].Correct) {
      UserOption.ClassList.Add("Correct");
      ScoreCount++;
    } else {
      UserOption.ClassList.Add("Incorrect");
      //For Marking The Correct Option
      Options.ForEach((Element) => {
    if (Element.InnerText == QuizArray[QuestionCount].Correct) {
          Element.ClassList.Add("Correct");
        }
      });
    }
  
    //Clear Interval(Stop Timer)
    ClearInterval(Countdown);
    //Disable All Options
    Options.ForEach((Element) => {
      Element.Disabled = True;
    });
  }
  
  //Initial Setup
  function Initial() {
    QuizContainer.InnerHTML = "";
    QuestionCount = 0;
    ScoreCount = 0;
    Count = 11;
    ClearInterval(Countdown);
    TimerDisplay();
    QuizCreator();
    QuizDisplay(QuestionCount);
  }
  
  //When User click On Start Button
  StartButton.addEventListener("click", () => {
    StartScreen.ClassList.Add("hide");
    DisplayContainer.ClassList.Remove("hide");
    Initial();
  });
  
  //hide Quiz And Display Start Screen
  Window.Onload = () => {
    StartScreen.ClassList.Remove("hide");
    DisplayContainer.ClassList.Add("hide");
  };