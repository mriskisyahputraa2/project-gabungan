import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import SettingList from "../../components/SettingList/SettingList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [navigate, isError]);
  return (
    <div>
      <Layout>
        <SettingList />
      </Layout>
    </div>
  );
};

export default Settings;
