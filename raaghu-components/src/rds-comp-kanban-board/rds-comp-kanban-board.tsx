import React, { useEffect } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsDatePicker,
  RdsDropdownList,
  RdsLabel,
  RdsModal,
  RdsProgressBar,
} from "../rds-elements";
import { useState } from "react";
import { RdsInput } from "../rds-elements";
import { RdsIcon } from "../rds-elements";
import { RdsCard } from "../rds-elements";
import { RdsBadge } from "../rds-elements";
import "./rds-comp-kanban-board.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export interface KanbanBoardProps {
  inputValue: string;
}

const KanbanBoard = (props: KanbanBoardProps) => {
  const [inputValue, setInputValue] = useState(props.inputValue);
  const [visibleInput, setVisibleInput] = useState(false);
  const [addButton, setAddButton] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  
  const [cards, setCards] = useState<
    {
      subCardIndex: number;
      name: string;
      subCards: {
        subcardName: string;
        subcardPriority: string;
        subcardQuestion: string;
        subcardDate: string;
        SubcardId: number;
      }[];
      cardId: number;
    }[]
  >([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([]);
  const [isSubCardDropdownOpen, setIsSubCardDropdownOpen] = useState<boolean[]>(
    []
  );
  const [subCardInputVisible, setSubCardInputVisible] = useState<number | null>(
    null
  );
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Adding ordinal suffix to the day
    const ordinalSuffix = (n: number) => {
      return (
        n + (["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th")
      );
    };

    return `${ordinalSuffix(day)} ${month} ${year}`;
  };
  const [subCardTitleValue, setsubCardTitleValue] = useState<string>("");
  const [subCardPriorityValue, setsubCardPriorityValue] = useState<string>("");
  const [subCardQuestionValue, setsubCardQuestionValue] = useState<string>("");
  const [subCardDateValue, setsubCardDateValue] = useState<string>(
    formatDate(new Date())
  );
  const [showInputTask, setShowInputTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<
    {
      name: string;
      completed: boolean;
      subCardIndex: number;
      cardIndex: number;
      taskId: number;
    }[]
  >([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  const priorityList = [
    {
      label: "High",
      val: "High",
    },
    {
      label: "Moderate",
      val: "Moderate",
    },
    {
      label: "Low",
      val: "Low",
    },
  ];

  useEffect(() => {
    setInputValue(props.inputValue);
  }, [props.inputValue]);

  const showInput = () => {
    setVisibleInput(true);
    setInputValue("");
    // setShowCard(false);
  };

  const onAddButtonClick = () => {
    // When initializing tasks for each sub-card, ensure correct assignment of subCardIndex
    setCards((prevCards) => [
      ...prevCards,
      {
        name: inputValue,
        subCards: [],
        subCardIndex: prevCards.length,
        cardId: generateRandomId(),
      },
    ]);
    setIsDropdownOpen((prevState) => [...prevState, false]);
    setVisibleInput(false);
    setAddButton(true);
    setShowCard(true);
  };

  const onCancel = () => {
    setVisibleInput(false);
    setAddButton(true);
    setInputValue("");
    setShowCard(true);
  };

  const handleDataChanges = (event: any) => {
    setInputValue(event.target.value);
  };

  const toggleDropdown = (index: number) => {
    setIsDropdownOpen((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const toggleSubCardDropdown = (index: number) => {
    setIsSubCardDropdownOpen((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const editBoardName = (index: number) => {
    setIsEditingBoardName(true);
    setInputValue(cards[index].name);
    setIsDropdownOpen((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };


  const deleteCard = (index: number) => {
    setCards((prevCards) => prevCards.filter((card, i) => i !== index));
    setIsDropdownOpen((prevState) =>
      prevState.filter((state, i) => i !== index)
    );
  };

  const deleteSubCard = (index: number, subCardIndex: number) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index
          ? {
              ...card,
              subCards: card.subCards.filter(
                (subCard, j) => subCard.SubcardId !== subCardIndex
              ),
            }
          : card
      )
    );
  };

  const addSubCard = (index: number) => {
    setSubCardInputVisible(index);
  };

  const onAddSubCardClick = (index: number) => {
    setsubCardDateValue(formatDate(new Date()));

    // Update the cards state to add the new sub-card to the specified card index
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const subcard = {
        subcardName: subCardTitleValue,
        subcardPriority: subCardPriorityValue,
        subcardQuestion: subCardQuestionValue,
        subcardDate: subCardDateValue,
        SubcardId: generateRandomId(),
      };
      updatedCards[index].subCards.push(subcard);
      return updatedCards;
    });
    setIsSubCardDropdownOpen((prevState) => [...prevState, false]);
    // Reset sub-card input visibility and value
    setSubCardInputVisible(null);
    setsubCardTitleValue("");
    setsubCardPriorityValue("");
    setsubCardQuestionValue("");
    setsubCardDateValue(formatDate(new Date()));
  };

  const handleAddTask = (cardIndex: number, subCardIndex: number) => {
    const newTask = {
      name: taskName,
      completed: false,
      cardIndex,
      subCardIndex,
      taskId: generateRandomId(),
    };
    // rest of your code...
    setTasks([...tasks, newTask]);
    setTaskName("");
    setShowInputTask(false);
    setTotalTasks(totalTasks + 1);

    // Update completed tasks count if the new task is completed
    if (newTask.completed) {
      setCompletedTasks(completedTasks + 1);
    }
  };

  function generateRandomId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  const handleCheckboxClick = (
    cardIndex: number,
    subCardIndex: number,
    taskIndex: number
  ) => {
    const updatedTasks = tasks.map((task, index) => {
      if (
        task.cardIndex === cardIndex &&
        task.subCardIndex === subCardIndex &&
        task.taskId === taskIndex
      ) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          setCompletedTasks(completedTasks + 1);
        } else {
          setCompletedTasks(completedTasks - 1);
        }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (
    cardIndex: number,
    subCardIndex: number,
    taskIndex: number
  ) => {
    const deletedTask = tasks.find(
      (task, index) =>
        task.cardIndex === cardIndex &&
        task.subCardIndex === subCardIndex &&
        task.taskId === taskIndex
    );
    if (deletedTask) {
      const updatedTasks = tasks.filter(
        (task, index) =>
          !(
            task.cardIndex === cardIndex &&
            task.subCardIndex === subCardIndex &&
            task.taskId === taskIndex
          )
      );
      setTasks(updatedTasks);
      setTotalTasks(totalTasks - 1);
      if (deletedTask.completed) {
        setCompletedTasks(completedTasks - 1);
      }
    }
  };

  const handleDeleteAllTasks = (index: number) => {
    const newTasks = tasks.filter((task) => task.subCardIndex !== index);
    setTasks(newTasks);
    setTotalTasks(totalTasks - newTasks.length);
    const deletedCompletedTasks = newTasks.filter((task) => task.completed);
    setCompletedTasks(completedTasks - deletedCompletedTasks.length);
  };

  const subCardProgress = (cardIndex: number, subCardIndex: number) => {
    const subCardTasks = tasks.filter(
      (task) =>
        task.cardIndex === cardIndex && task.subCardIndex === subCardIndex
    );
    const completedTasks = subCardTasks.filter((task) => task.completed).length;
    const totalTasks = subCardTasks.length;

    if (totalTasks > 0) {
      const progressPercentage = (completedTasks / totalTasks) * 100;
      const progress = Math.floor(progressPercentage);
      return progress;
    } else {
      return 0;
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "subCard") {
      const startCard = cards.find(
        (card) => card.subCardIndex == source.droppableId
      );
      const finishCard = cards.find(
        (card) => card.subCardIndex == destination.droppableId
      );

      if (!startCard || !finishCard) {
        return;
      }

      const startCardIndex = cards.indexOf(startCard);
      const finishCardIndex = cards.indexOf(finishCard);

      if (startCardIndex === finishCardIndex) {
        // Reorder within the same card
        const newSubCards = Array.from(startCard.subCards);
        const movedSubCard = newSubCards.find(
          (subCard) => subCard.SubcardId === Number(draggableId)
        );
        const sourceIndex = movedSubCard
          ? newSubCards.indexOf(movedSubCard)
          : -1;
        const secondSubCard = newSubCards.find(
          (subCard) => subCard.SubcardId === Number(destination.index)
        );
        const secondsourceIndex = secondSubCard
          ? newSubCards.indexOf(secondSubCard)
          : -1;

        if (movedSubCard && sourceIndex !== -1) {
          let temp = newSubCards[sourceIndex];
          newSubCards[sourceIndex] = newSubCards[secondsourceIndex];
          newSubCards[secondsourceIndex] = temp;

          const newCards = Array.from(cards);
          newCards[startCardIndex] = {
            ...newCards[startCardIndex],
            subCards: newSubCards,
          };

          setCards(newCards);

          // Reorder tasks within the same card
          const reorderedTasks = tasks.map((task) => {
            if (
              task.cardIndex === source.droppableId &&
              task.subCardIndex === Number(draggableId)
            ) {
              return { ...task, subCardId: Number(draggableId) };
            } else if (
              task.cardIndex === destination.droppableId &&
              task.subCardIndex === destination.droppableId
            ) {
              return { ...task, subCardId: destination.droppableId };
            }
            return task;
          });

          setTasks(reorderedTasks);
        }
      } else {
        // Move to a different card
        const startSubCards = Array.from(startCard.subCards);
        const movedSubCard = startSubCards.find(
          (subCard) => subCard.SubcardId === Number(draggableId)
        );
        const sourceIndex = movedSubCard
          ? startSubCards.indexOf(movedSubCard)
          : -1;

        if (movedSubCard && sourceIndex !== -1) {
          startSubCards.splice(sourceIndex, 1);
          const finishSubCards = Array.from(finishCard.subCards);
          finishSubCards.splice(destination.index, 0, movedSubCard);

          const newCards = Array.from(cards);
          newCards[startCardIndex] = {
            ...newCards[startCardIndex],
            subCards: startSubCards,
          };
          newCards[finishCardIndex] = {
            ...newCards[finishCardIndex],
            subCards: finishSubCards,
          };

          setCards(newCards);

          // Update the cardId and subCardId of the moved subcard's tasks
          const updateTask = tasks
            .filter((task) => task.subCardIndex === Number(draggableId))
            .map((task) => task.taskId);
          const updatedTasks = tasks.map((task) => {
            if (
              task.cardIndex === source.droppableId &&
              task.subCardIndex === Number(draggableId)
            ) {
              return {
                ...task,
                cardId: finishCard.cardId,
                subCardId: Number(draggableId),
              };
            }
            if (updateTask.includes(task.taskId)) {
              task.cardIndex = Number(destination.droppableId);
              return {
                ...task,
                cardId: finishCard.cardId,
                subCardId: destination.droppableId,
              };
            }
            return task;
          });

          setTasks(updatedTasks);
        }
      }
    }
  };

  const handleChange = (val: any, selectedCardId: any) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.cardId === selectedCardId
          ? { ...card, name: val.defaultValue }
          : card
      )
    );
    setIsEditingBoardName(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="row d-flex ">
        {cards.map((card, index) => (
          <div
            className={showCard && card.name ? "col-md-3 mt-2 " : ""}
            key={index}
          >
            {showCard && card.name && (
              <div className="kanban-board">
                <RdsCard
                  cardTitle={
                    <div className="row">
                      <div className="col-md-8">
                        {!isEditingBoardName ? (
                          <div className="d-flex">
                            <span className="f-14 fw-400">{card.name}</span>
                            <span className="mx-2 f-14 fw-400">
                              ({card.subCards.length.toString()})
                            </span>
                          </div>
                        ) : (
                          <div className="d-flex">
                            <RdsInput
                              size="small"
                              inputType="text"
                              customClasses="form-control margin-top-5"
                              value={card.name}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleChange(e.target, card.cardId);
                                }
                              }}
                            ></RdsInput>
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-end">
                          <div className="btn-group dropstart">
                            <button
                              className="btn btn-sm btn-icon border-0 three-dot-btn"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="true"
                              aria-expanded="false"
                              onClick={() => toggleDropdown(index)}
                            >
                              <RdsIcon
                                name={"three_dots"}
                                height="14px"
                                width="14px"
                                fill={true}
                              />
                            </button>
                            <ul
                              aria-labelledby="dropdownMenuButton"
                              className={`dropdown-menu dropdown-adjusted ${
                                isDropdownOpen[index] ? "show" : ""
                              } dropdown-right`}
                            >
                              <li onClick={() => editBoardName(index)}>
                                <a
                                  data-bs-toggle="modal"
                                  className="dropdown-item"
                                >
                                  <RdsLabel label="Edit" />
                                </a>
                              </li>
                              <li onClick={() => deleteCard(index)}>
                                <a
                                  data-bs-toggle="modal"
                                  className="dropdown-item"
                                >
                                  <RdsLabel label="Delete Board" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  cardText={
                    <>
                      <Droppable droppableId={`${index}`} type="subCard">
                        {(provided: any) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {card.subCards.map((subCard) => (
                              <Draggable
                                key={subCard.SubcardId}
                                draggableId={`${subCard.SubcardId}`}
                                index={subCard.SubcardId}
                              >
                                {(provided: any) => (
                                  <div
                                    className="mt-2 row sub-card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <RdsCard
                                      key={subCard.SubcardId}
                                      cardTitle={
                                        <>
                                          <div className="row">
                                            <div className="col-md-8">
                                              <div className="d-flex flex-column">
                                                <span className="f-12 fw-500">
                                                  {subCard.subcardName}
                                                </span>
                                                <div className="priority-btn mt-1">
                                                  <RdsBadge
                                                    badgeType="rectangle"
                                                    colorVariant="primary"
                                                    label={
                                                      subCard.subcardPriority
                                                    }
                                                    size="small"
                                                    className="custom-badge"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="d-flex justify-content-end">
                                                <div className="btn-group dropstart">
                                                  <button
                                                    className="btn btn-sm btn-icon border-0 three-dot-btn"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    data-bs-auto-close="true"
                                                    aria-expanded="false"
                                                    onClick={() =>
                                                      toggleSubCardDropdown(
                                                        index
                                                      )
                                                    }
                                                  >
                                                    <RdsIcon
                                                      name={"three_dots"}
                                                      height="14px"
                                                      width="14px"
                                                      fill={true}
                                                    />
                                                  </button>
                                                  <ul
                                                    aria-labelledby="dropdownMenuButton"
                                                    className={`dropdown-menu dropdown-adjusted ${
                                                      isSubCardDropdownOpen[
                                                        index
                                                      ]
                                                        ? "show"
                                                        : ""
                                                    } dropdown-right`}
                                                  >
                                                    
                                                    <li
                                                      onClick={() =>
                                                        deleteSubCard(
                                                          index,
                                                          subCard.SubcardId
                                                        )
                                                      }
                                                    >
                                                      <a
                                                        data-bs-toggle="modal"
                                                        className="dropdown-item"
                                                      >
                                                        <RdsLabel label="Delete Card" />
                                                      </a>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      }
                                      cardText={
                                        <>
                                          <div className="mb-2">
                                            <span className="f-16 fw-500 truncate-text">
                                              {subCard.subcardQuestion}
                                            </span>
                                          </div>
                                          <div className="row">
                                            <div className="col-12 d-flex justify-content-between">
                                              <span className="f-12 fw-500">
                                                {subCard.subcardDate}
                                              </span>
                                              <span className="f-12 fw-500">
                                                <img
                                                  src="./assets/kanban.png"
                                                  alt="profilePic"
                                                  width="24px"
                                                  height="24px"
                                                  className="rounded-circle"
                                                ></img>
                                              </span>
                                            </div>
                                          </div>
                                        </>
                                      }                                      
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {/* {provided.placeholder} */}
                            {subCardInputVisible === index ? (
                              <div className="mt-1">
                                <RdsInput
                                  id=""
                                  inputType="text"
                                  placeholder="Enter Card Title"
                                  size="small"
                                  value={subCardTitleValue}
                                  onChange={(event) =>
                                    setsubCardTitleValue(event.target.value)
                                  }
                                />
                                <RdsDropdownList
                                  data-testid="priority"
                                  borderDropdown={true}
                                  placeholder="Select Priority"
                                  listItems={priorityList}
                                  isPlaceholder={true}
                                  onClick={(e: any, val: any) =>
                                    setsubCardPriorityValue(val)
                                  }
                                />
                                <RdsInput
                                  id=""
                                  inputType="text"
                                  placeholder="Enter Question"
                                  size="small"
                                  value={subCardQuestionValue}
                                  onChange={(event) =>
                                    setsubCardQuestionValue(event.target.value)
                                  }
                                />
                                {/* <RdsDatePicker
                                                   onDatePicker={handleEndDate}
                                                   DatePickerLabel="Select Date"
                                                   type="default"
                                                   isDropdownOpen={false}
                                                /> */}
                                <div className="mt-2 d-flex add-item-btn btn-margin">
                                  <RdsButton
                                    colorVariant="default"
                                    icon="plus_circle"
                                    label="Add Item"
                                    size="medium"
                                    onClick={() => onAddSubCardClick(index)}
                                  />
                                  <RdsIcon
                                    classes={"m-2"}
                                    colorVariant="black"
                                    name="cancel"
                                    height="13px"
                                    width="13px"
                                    onClick={() => setSubCardInputVisible(null)}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="mt-2 add-item-btn">
                                <RdsButton
                                  class="w-100"
                                  colorVariant="default"
                                  icon="plus_circle"
                                  label="Add Item"
                                  size="medium"
                                  onClick={() => addSubCard(index)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </>
                  }
                ></RdsCard>
              </div>
            )}
          </div>
        ))}
        {visibleInput && (
          <div className="mx-2 mt-2 add-board">
            <div className="col-md-12">
              <RdsInput
                id=""
                inputType="text"
                placeholder="Enter Board Title"
                size="small"
                value={inputValue}
                onChange={(event) => handleDataChanges(event)}
              />
            </div>
            <div className="mt-2 d-flex add-item-btn btn-margin">
              <RdsButton
                colorVariant="default"
                icon="plus_circle"
                label="Add Board"
                size="medium"
                onClick={onAddButtonClick}
              />
              <RdsIcon
                classes={"m-2"}
                colorVariant="black"
                name="cancel"
                height="13px"
                width="13px"
                onClick={onCancel}
              />
            </div>
          </div>
        )}
        {!visibleInput && addButton && (
          <div className="d-flex align-items-center mt-2 mx-2 add-board">
            <div className="add-item-btn add-board-btn flex-grow-1">
              <RdsButton
                class="mt-2"
                colorVariant="default"
                icon="plus_circle"
                label="Add Board"
                size="medium"
                onClick={showInput}
              />
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
