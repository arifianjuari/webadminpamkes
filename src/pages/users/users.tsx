/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import MainLayout from "../../component/Layouts/MainLayout";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import UserData from "../../interface/users_interface";

const Users: React.FC = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [usersFilterData, setUsersFilterData] = useState<UserData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to the "users" collection in Firestore
        const userCollection = collection(db, "users");

        // Listen for changes in the "users" collection
        onSnapshot(userCollection, (snapshot) => {
          const userData: UserData[] = snapshot.docs
            .filter((doc) => doc.data().status_aktivasi === false)
            .map((doc) => {
              const data = doc.data();
              return {
                alamat: data.alamat,
                created_at: data.created_at,
                foto_diri: data.foto_diri,
                foto_kartu_identitas: data.foto_kartu_identitas,
                institusi: data.institusi,
                is_online: data.is_online,
                jabatan: data.jabatan,
                jenis_kelamin: data.jenis_kelamin,
                kabupaten: data.kabupaten,
                kecamatan: data.kecamatan,
                last_active: data.last_active,
                nama_lengkap: data.nama_lengkap,
                nomor_bpjs: data.nomor_bpjs,
                nomor_identifikasi: data.nomor_identifikasi,
                nomor_telepon: data.nomor_telepon,
                peran: data.peran,
                provinsi: data.provinsi,
                status_aktivasi: data.status_aktivasi,
                status_skrining: data.status_skrining,
                tanggal_lahir: data.tanggal_lahir,
                token: data.token,
              };
            });
          setUsersData(userData);
          setUsersFilterData(userData);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []); // Run once on component mount
  const SearchUser = (name: string) => {
    if (name !== "") {
      const filteredUsers = usersFilterData.filter((user) =>
        user.nama_lengkap.toLowerCase().includes(name.toLowerCase())
      );
      setUsersData(filteredUsers);
    } else {
      setUsersData(usersFilterData);
    }
  };
  return (
    <MainLayout>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4 className="card-title">Approval</h4>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search by name..."
                  onChange={(e) => SearchUser(e.target.value)}
                />
              </div>
              {usersData.length > 0 ? (
                <div className="table-responsive">
                  <table className="table datatables">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nama Lengkap</th>
                        <th>Role</th>
                        <th>Nomor Identitas (NIK)</th>
                        <th>Nomor BPJS</th>
                        <th>Jenis Kelamin</th>
                        <th>Nomor WhatsApp</th>
                        <th>Institusi</th>
                        <th>Provinsi</th>
                        <th>Kabupaten/Kota</th>
                        <th>Kecamatan</th>
                        <th>Alamat Petugas</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersData.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.nama_lengkap}</td>
                          <td>{user.peran}</td>
                          <td>{user.nomor_identifikasi}</td>
                          <td>{user.nomor_bpjs}</td>
                          <td>{user.jenis_kelamin}</td>
                          <td>{user.nomor_telepon}</td>
                          <td>{user.institusi}</td>
                          <td>{user.provinsi}</td>
                          <td>{user.kabupaten}</td>
                          <td>{user.kecamatan}</td>
                          <td>{user.alamat}</td>
                          <td>
                            <button className="btn btn-success mr-2">
                              Approve
                            </button>
                            <button className="btn btn-danger">Reject</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center">Data tidak tersedia</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
