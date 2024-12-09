import React, { useEffect, useState } from "react";
import { Table, Button, notification } from "antd";
import { Link } from "react-router-dom"; // Importando o Link do react-router-dom
import type { ColumnsType } from "antd/es/table";

import { Firmwares, Firmware, Group } from "../core/models"; // Supondo que você tem modelos definidos para grupos
import { getAllFirmware } from "../core/service/firmware";
import { getAllGroup } from "../core/service/group";


const FirmwareList: React.FC = () => {
  const [firmwares, setFirmwares] = useState<Firmwares>();
  const [_, setGroups] = useState<Group[]>([]); // Lista de grupos
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carregar firmwares e grupos
    const fetchData = async () => {
      setLoading(true);

      try {
        const firmwareData = await getAllFirmware();
        setFirmwares(firmwareData);

        const groupData = await getAllGroup();
        const activeGroups = groupData.results.filter(
          (group: Group) => group.active && !group.is_deleted
        );
        setGroups(activeGroups);
      } catch (error) {
        notification.error({
          message: "Erro ao carregar dados",
          description: "Não foi possível carregar firmwares ou grupos.",
        });
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const columns: ColumnsType<Firmware> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Versão",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Link BIN", 
      dataIndex: "link_bin",
      key: "link_bin",
      // Removido o render para o link de download
      render: () => null,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, firmware) => (
        // Usando Link para navegação
        <Link to={`/firmware/${firmware.uuid}`}>
          <Button type="primary">Ir para Firmware</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <h1>Lista de Firmwares</h1>
      <Table
        dataSource={firmwares?.results}
        columns={columns}
        rowKey="uuid"
        loading={loading}
      />
    </div>
  );
};

export default FirmwareList;
