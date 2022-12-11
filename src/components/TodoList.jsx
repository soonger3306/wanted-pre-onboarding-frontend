import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import api from "../shared/api";

const TodoList = ({ contents, setTodoList }) => {
  const { id, isCompleted, todo } = contents;
  const [check, setCheck] = useState(isCompleted);
  const [isEdit, setIsEdit] = useState(false);
  // 삭제
  console.log(id);
  const todoDeletHandler = async (e) => {
    e.preventDefault();
    await api.delete(`/todos/${id}`);
    setTodoList((props) => props.filter((todo) => todo.id !== id));
  };

  //수정
  const [updateTodo, setUpdateTodo] = useState("");

  const onChangeUpDateTodoHandler = (e) => {
    setUpdateTodo(e.target.value);
  };

  const makeInput = async (e) => {
    await api.put(`/todos/${id}`, {
      todo: updateTodo,
      isCompleted: isCompleted,
    });
    setTodoList((props) =>
      props.map((todo) =>
        todo.id === id ? { ...todo, todo: updateTodo } : todo
      )
    );
    setIsEdit((props) => !props);
  };

  const onClickSetEdit = () => {
    setIsEdit((props) => !props);
  };

  const doneHandler = async (e) => {
    await api.put(`/todos/${id}`, {
      todo: todo,
      isCompleted: !isCompleted,
    });
    setTodoList((props) =>
      props.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };
  return (
    <Div>
      {!isEdit ? (
        <Card>
          <div>
            {todo}
            <Button onClick={doneHandler}>{check ? "✗" : "O"}</Button>
          </div>

          <div>
            <Buttons onClick={onClickSetEdit}>✍</Buttons>
            <Buttons onClick={todoDeletHandler}>❌</Buttons>
          </div>
        </Card>
      ) : (
        <>
          <Input value={updateTodo} onChange={onChangeUpDateTodoHandler} />
          <Buttons onClick={makeInput}>✅</Buttons>
          <Buttons onClick={onClickSetEdit}>🔙</Buttons>
        </>
      )}
    </Div>
  );
};

export default TodoList;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  width: 40vw;
  height: 6vh;
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: #dcf5f55e;
`;
const Input = styled.input`
  width: 50%;
  height: 6%;
  padding: 10px;
  font-size: 20px;
  border: 1px solid rgb(87, 159, 222);
  background-color: #ffffffd0;
  border-radius: 10px;

  &:hover {
    border: 1px solid rgb(42, 134, 214);
  }
  &:focus {
    outline: 1px solid rgb(42, 134, 214);
  }
`;
const Button = styled.button`
  color: #72da87;
  font-size: 20px;
  background-color: #1a2a85;
  border: none;
  border-radius: 15px;
  height: 30px;
  width: 30px;
  margin: 10px;
`;
const Buttons = styled.button`
  background-color: transparent;
  border: none;
`;
